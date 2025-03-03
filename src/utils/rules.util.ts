import type { Rule } from 'rc-field-form/lib/interface';

const required: Rule = {
  message: '필수 항목입니다.',
  required: true,
};

const email: Rule = { message: '이메일 형식으로 입력해주세요.', type: 'email' };

const maxLength = (max: number): Rule => ({
  message: `최대 ${max} 자를 초과할 수 없습니다.`,
  validator(_, value) {
    if (!value || value.length <= max) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
});

const rules = {
  email,
  maxLength,
  required,
};

export default rules;
