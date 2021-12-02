import { useSelector } from 'react-redux';
import { postRequest } from '../../../data/data-source/remote/apiCall';
import updateStyles from './update.module.css';
import { useEffect } from 'react';
import { useState } from 'react';

function Update() {
  const isUserLoggedIn = useSelector(
    (state) => state.loginReducer.isUserLoggedIn
  );

  const emailId = useSelector((state) => state.userReducer.email);
  const [links, setlinks] = useState({});
  const [change, setchange] = useState(-1);
  var res = '';

  async function addLink() {
    const platform = document.getElementById('platformInput').value;
    const link = document.getElementById('linkInput').value;
    console.log(platform, link, emailId);

    res = await postRequest(
      'updateAccount',
      {
        platform: platform,
        platformUsername: link,
        emailId: emailId,
      },
      ''
    );

    setchange(1);
  }

  useEffect(() => {
    if (isUserLoggedIn)
      postRequest(
        'userDetails',
        {
          emailId: emailId,
        },
        'access_token'
      ).then((res) => {
        console.log(res.data.accounts);
        setchange(0);
        setlinks(res.data.accounts);
      });
  }, [change]);

  return (
    <div className={updateStyles.parent}>
      <input
        placeholder="platform"
        className={updateStyles.platformBox}
        id="platformInput"
      ></input>
      <input
        placeholder="profile username"
        className={updateStyles.linkBox}
        id="linkInput"
      ></input>
      <div onClick={addLink} className={updateStyles.button}>
        Add
      </div>
      <div>
        {Object.keys(links).map((link) => (
          <p className={updateStyles.platforms}>{`${link}`}</p>
        ))}
      </div>
      <div>
        {Object.keys(links).map((link) => (
          <p className={updateStyles.platformLinks}>{`${links[link]}`}</p>
        ))}
      </div>
    </div>
  );
}

export default Update;
