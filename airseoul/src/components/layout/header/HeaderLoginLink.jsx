import { ROUTES } from '../../../constants/routes';
import { iconSize } from '../../../tokens/size';
import LoginIcon from '../../icons/LoginIcon';

export default function HeaderLoginLink({
  labelMode = 'full',
  iconSizeValue = iconSize.xs,
}) {
  const isIconOnly = labelMode === 'icon';

  return (
    <a
      className="site-header__login-link"
      href={ROUTES.auth.login}
      aria-label={isIconOnly ? '로그인' : undefined}
    >
      <LoginIcon
        className="site-header__action-symbol"
        size={iconSizeValue}
      />

      {!isIconOnly && <span>로그인</span>}
    </a>
  );
}