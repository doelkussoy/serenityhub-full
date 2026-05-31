import { Link } from 'react-router-dom';

const FloatingButton = () => {
  return (
    <div>
        <Link to="/">
        <button  className='fixed right-4 top-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600'>
            Back to Home
        </button>
    </Link>
    </div>
    
  );
};

export default FloatingButton;
