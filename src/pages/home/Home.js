import { useQuery } from '../../hooks/useQuery';
import TransactionsList from './TransactionsList';
import TransactionForm from './TransactionForm';
import styles from './Home.module.css';

export default function Home() {
  const { documents, error } = useQuery('transactions');
  // console.log(documents);

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionsList transactions={documents} />}
      </section>
      <aside className={styles.sidebar}>
        <TransactionForm />
      </aside>
    </main>
  );
}
