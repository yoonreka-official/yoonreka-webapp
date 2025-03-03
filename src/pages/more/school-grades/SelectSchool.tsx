import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { getSchools } from '~/api/school-grade.api.ts';
import Flex from '~/components/display/Flex.tsx';
import AutoComplete from '~/components/inputs/AutoComplete.tsx';
import Spinner from '~/components/utils/Spinner.tsx';

import type { AutoCompleteProps } from '~/components/inputs/AutoComplete.tsx';
import type { SelectOption } from '~/components/inputs/Select.tsx';

function SelectSchool({
  ...props
}: Omit<AutoCompleteProps, 'options' | 'filterOption'>) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOption = useDebouncedCallback(async value => {
    const searchKeyword = value.trim();
    if (!searchKeyword || searchKeyword.length < 2) {
      setOptions([]);
      return;
    }

    setIsLoading(true);

    const { data } = await getSchools(searchKeyword);

    setOptions(
      data.schoolPagination.edges.map(item => ({
        value: item.node.id,
        label: item.node.name,
      })),
    );

    setIsLoading(false);
  }, 400);

  return (
    <AutoComplete
      filterOption={false}
      options={options}
      {...props}
      notFoundContent={
        isLoading ? (
          <Flex height={120} items="center" justify="center">
            <Spinner size={24} />
          </Flex>
        ) : null
      }
      showSearch
      onSearch={value => handleOption(value)}
    />
  );
}

export default SelectSchool;
