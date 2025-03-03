import { css } from '@emotion/react';

import Flex from '~/components/display/Flex.tsx';
import Caption from '~/components/typography/Caption.tsx';
import { COLORS } from '~/configs/theme.ts';
import useGrades from '~/hooks/useGrades.ts';
import DefaultChart from '~/pages/grades/DefaultChart.tsx';
import { formatDate } from '~/utils/format.util.ts';

function GradeTotalTabContent() {
  const {
    state: { selectedLabel, statistics },
  } = useGrades();

  return (
    <Flex direction="column" gap={28} style={{ marginTop: 28 }}>
      <section>
        <Caption
          color={COLORS.FONT['40']}
          css={styles.sectionTitle}
          size={12}
          weight="bold"
        >
          Graph(%)
        </Caption>

        <DefaultChart />
      </section>

      <section>
        <Caption
          color={COLORS.FONT['40']}
          css={styles.sectionTitle}
          size={12}
          weight="bold"
        >
          Comment
        </Caption>

        <div css={styles.container}>
          <Caption
            color={selectedLabel?.comment ? COLORS.FONT['80'] : COLORS.BG['04']}
            size={12}
          >
            {selectedLabel?.comment || '개별 코멘트가 없습니다.'}
          </Caption>
        </div>
      </section>

      <section>
        <Caption
          color={COLORS.FONT['40']}
          css={styles.sectionTitle}
          size={12}
          weight="bold"
        >
          Table
        </Caption>

        <div css={styles.container}>
          <table css={styles.table}>
            <thead>
              <tr>
                <th>날짜</th>
                <th>맞은문제</th>
                <th>전체문제</th>
                <th>상위 30%</th>
                <th>최고점</th>
              </tr>
            </thead>
            <tbody>
              {statistics?.map((item, i) => (
                <tr key={i}>
                  <td>{formatDate(item.date, 'MM.DD')}</td>
                  <td>{item.value}</td>
                  <td>{item.maxValue}</td>
                  <td>{item.top30}</td>
                  <td>{item.highest}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!statistics?.length && (
            <Flex
              items="center"
              justify="center"
              style={{ height: 120, width: '100%' }}
            >
              <Caption color={COLORS.BG['04']} size={12}>
                데이터가 없습니다.
              </Caption>
            </Flex>
          )}
        </div>
      </section>
    </Flex>
  );
}
const styles = {
  container: css`
    display: flex;
    padding: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
    border-radius: 8px;
    background: ${COLORS.BG.BACKGROUND_TEXT};
  `,

  sectionTitle: css`
    margin-bottom: 4px;
  `,

  table: css`
    width: 100%;

    th {
      color: var(--Font-20, #a0a5ac);
      text-align: center;
      /* Caption/12/B */
      font-size: 12px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: -0.2px;

      border-bottom: 1px solid var(--BG-01, #ebf1ff);
    }

    td {
      color: var(--Font-80, #4d5055);
      text-align: center;
      /* Caption/12/M */
      font-size: 12px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: -0.2px;
    }
  `,
};

export default GradeTotalTabContent;
