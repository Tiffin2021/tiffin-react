import './SampleView.css';
import { Link } from 'react-router-dom';
import headerImage from 'src/pictures/businessBackground2.jpg';

export const SampleView: React.FC = () => {
  return (
    <div>
      <img src={headerImage} className="backgroundImage" />
      <div className="onImage">
        <div className="logo">🍴tiffin🍴</div>
        <div className="backgroundForm">
          <h1 className="pageTitle">Home</h1>
          <div className="buttonCenter">
            <Link to="/shopAccountRegister">
              <button>新規登録</button>
            </Link>
          </div>
          <div className="buttonCenter">
            <Link to="/login">
              <button>ログイン</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
