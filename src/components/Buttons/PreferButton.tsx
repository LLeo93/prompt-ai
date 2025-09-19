import Tooltip from '../Tooltip';
import { Link } from 'react-router-dom';
import Button from './Button';

function PreferButton() {
  const linkClasses =
    'inline-block text-cyan-500 hover:bg-yellow-500 text-slate-900 font-bold rounded-lg transition duration-300';

  return (
    <div className="mt-7 mb-5 text-center">
      <Tooltip text="Visualizza la lista dei tuoi prompt preferiti">
        <Link to="/favorites" className={linkClasses}>
          <Button className="text-cyan" variant="special">
            Preferiti ⭐
          </Button>
        </Link>
      </Tooltip>
    </div>
  );
}

export default PreferButton;
