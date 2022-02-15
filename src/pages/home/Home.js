// import styles from './Home.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Home() {
  const context = useAuthContext();
  console.log(context);

  return <div>Home</div>;
}
