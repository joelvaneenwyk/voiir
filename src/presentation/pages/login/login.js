import loginStyles from './login.module.css';
import art from '../../../assets/art.png';
import logo from '../../../assets/logo.svg';
import {
  HOME_PAGE_ROUTE,
  ONBOARDING_PAGE_ROUTE,
} from '../../routes/route-paths';
import { Link } from 'react-router-dom';
import { loginActions, userActions } from '../../../domain/stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserModel from '../../../data/models/userModel';
import { GoogleLogin } from '@react-oauth/google';
import { USER_EXISTS } from '../../../data/data-source/remote/apiList';
import {
  getRequest,
  postRequest,
} from '../../../data/data-source/remote/apiCall';

function Login() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const clientID = process.env.REACT_APP_clientID;

  async function LoginHandler(user) {
    console.log(user);
    dispatch(loginActions.userLoggedIn());
    dispatch(userActions.initUser(user));
    console.log(user.profileObj.email);
    var res = await postRequest(
      USER_EXISTS,
      { emailId: user.profileObj.email },
      user.tokenObj.access_token
    );
    var result = res.data.response;
    if (result == false) history.push(ONBOARDING_PAGE_ROUTE);
    else history.push(HOME_PAGE_ROUTE);
  }

  function failed(error) {
    console.log(error);
  }

  return (
    <div>
      <div className={loginStyles.backdrop}>
        <div className={loginStyles.login}>
          <img src={art} alt="" className={loginStyles.art} />
          <div className={loginStyles.popup}>
            <Link className={loginStyles.cross} to={HOME_PAGE_ROUTE}>
              x
            </Link>
            <p className={loginStyles.title}>welcome to voiir</p>
            <p className={loginStyles.subTitle}>
              The <span style={{ color: '#9A3FCB' }}>yellow</span> pages of the
              21st century
            </p>
            <img src={logo} alt="" className={loginStyles.logo} />
            <GoogleLogin
              render={(renderProps) => (
                <div
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className={loginStyles.loginButton}
                >
                  login with google
                </div>
              )}
              className={loginStyles.gButton}
              clientId={clientID}
              icon=""
              buttonText=""
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              onSuccess={LoginHandler}
              onFailure={failed}
            />
            <div className={loginStyles.tc}>
              By signing in you agree to our{' '}
              <span style={{ color: '#9A3FCB' }}>terms and conditions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
