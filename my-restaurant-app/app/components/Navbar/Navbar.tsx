import Link from 'next/link';
import './Navbar.css';
import Modal from "../CartModal/CartModal";
import {useState, useEffect} from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

let gapi: any;

interface modalControl {
  setOpenModal: any;
  openModal: boolean;
}

function start(){
  gapi.client.init({
    clientId: '426894892243-8busb36ofb5949nkdf4qgvq10g0rci3l.apps.googleusercontent.com',
    scope:""
  })
};

const Navbar: React.FC<modalControl> = ({setOpenModal, openModal}: modalControl) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [temperature, setTemperature] = useState(null);
  
  useEffect(() => {
    import('gapi-script')
      .then((gapiModule) => {
        gapi = gapiModule;
        gapi.load('client:auth2', () => {
          gapi.client.init({
            clientId: '426894892243-8busb36ofb5949nkdf4qgvq10g0rci3l.apps.googleusercontent.com',
            scope: '',
          });
        });
      });
  }, []);
  
  const onSuccess = (response: any) => {
    // console.log(response);
    setIsLoggedIn(true);
}

const onFailure = (response: any) => {
    // console.log(response);
    setIsLoggedIn(false);
}



  return (
    <div>
      <nav className='navbar'>
        <div className='navlogo'>
          <Link href="/" passHref>
            PACO PACO
          </Link>
        </div>
        <button onClick={() => {if (openModal) setOpenModal(false); else setOpenModal(true);}}className='navImage'>
              <img src="images/img-5.png" className='w-10'/>
        </button>
        <ul className='navmenu'>

          <li className='navitem'>
          {!isLoggedIn && (
          <GoogleLogin className='navlink'
                clientId='426894892243-8busb36ofb5949nkdf4qgvq10g0rci3l.apps.googleusercontent.com'
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                hostedDomain='tamu.edu'
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
          )}
          {isLoggedIn && (
            <GoogleLogout className='navlink'
                clientId='426894892243-8busb36ofb5949nkdf4qgvq10g0rci3l.apps.googleusercontent.com'
                buttonText="Logout"
                onLogoutSuccess={() => setIsLoggedIn(false)}
              />
          )}
            
          </li>
          <li className='navitem'>
            <Link href="/menu" passHref className='navlink'>
              Menu
            </Link>
          </li>
          {isLoggedIn && (
            <>
          <li className='navitem'>

            <Link href="/manager" passHref className='navlink'>
              Manager
            </Link>
          </li>
          <li className='navitem'>
            <Link href="/waiter" passHref className='navlink'>
              Waiter
            </Link>
          </li>
          </>
          )}
        </ul>
      </nav>
      {openModal && <Modal
                      setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Navbar;
