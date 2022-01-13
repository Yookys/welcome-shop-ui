import React, {useState} from 'react';
import {Button, Input} from 'antd';

import {
  LoginPageContainer,
  LoginPageError,
  LoginPageFooter,
  LoginPageHead,
  LoginPageInputWrapper,
  LoginPageWrapper,
} from '@User/modules/LoginPage/LoginPage.styled';
import Typography, {typographyTag} from '@common/components/Typography/Typography';
import {loginPageLocal} from '@User/modules/LoginPage/constants/loginPageLocal';
import useRouter from '@common/hooks/useRouter';
import {EUserRoutingLocations, userRoutings} from '@User/constants/userRoutingConst';
import useForm from '@common/hooks/useForm';
import {isEmpty} from '@common/utils/commonUtils';
import useUserRest from '@User/hooks/useUserRest';

/**
 * Страница авторизации
 */
const LoginPage: React.FC = () => {
  /** Используем роутинг */
  const {goTo} = useRouter();
  /** Используем методы МКС */
  const {onLogin, isSubmitRequest, getErrorRequest} = useUserRest();
  /** Используем форму */
  const {fields, setField} = useForm<{login: string; password: string}>();
  /** Ключ запроса */
  const [requestKey, setRequestKey] = useState<string | null>(null);

  /**
   * Смена значений в полях ввода
   * @param field - Изменяемое поле
   */
  const handleChangeField = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setField(field, event.target.value);

  /**
   * Отправка формы
   */
  const handleSubmit = () => {
    if (!isSubmitRequest(requestKey)) {
      setRequestKey(onLogin(fields.login, fields.password));
    }
  };

  return (
    <LoginPageContainer>
      <LoginPageWrapper>
        <LoginPageHead>
          <Typography tag={typographyTag.h5}>{loginPageLocal.form.head}</Typography>
        </LoginPageHead>
        {!isEmpty(getErrorRequest(requestKey)) && (
          <LoginPageError>
            <Typography tag={typographyTag.p}>{getErrorRequest(requestKey)}</Typography>
          </LoginPageError>
        )}
        <LoginPageInputWrapper>
          <Input
            name="login"
            size="large"
            value={fields.login}
            disabled={isSubmitRequest(requestKey)}
            onChange={handleChangeField('login')}
            placeholder={loginPageLocal.form.loginPlaceholder}
          />
        </LoginPageInputWrapper>
        <LoginPageInputWrapper>
          <Input.Password
            name="password"
            size="large"
            value={fields.password}
            disabled={isSubmitRequest(requestKey)}
            onChange={handleChangeField('password')}
            placeholder={loginPageLocal.form.passwordPlaceholder}
          />
        </LoginPageInputWrapper>
        <LoginPageInputWrapper>
          <Button
            type="primary"
            size="middle"
            loading={isSubmitRequest(requestKey)}
            title={isEmpty(fields.login) || isEmpty(fields.password) ? 'Укажите логин или пароль' : undefined}
            disabled={isEmpty(fields.login) || isEmpty(fields.password)}
            onClick={handleSubmit}
          >
            {loginPageLocal.form.submitButton}
          </Button>
        </LoginPageInputWrapper>
        <LoginPageFooter>
          <Button
            onClick={goTo(userRoutings[EUserRoutingLocations.userRegistration].path)}
            disabled={isSubmitRequest(requestKey)}
            type="dashed"
            size="small"
          >
            {loginPageLocal.form.registrationButton}
          </Button>
          <Button
            onClick={goTo(userRoutings[EUserRoutingLocations.userRecovery].path)}
            disabled={isSubmitRequest(requestKey)}
            type="dashed"
            size="small"
          >
            {loginPageLocal.form.recoveryButton}
          </Button>
        </LoginPageFooter>
      </LoginPageWrapper>
    </LoginPageContainer>
  );
};

export default React.memo(LoginPage);
