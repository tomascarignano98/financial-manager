import TransactionForm from './TransactionForm';
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <section className={styles.content}>transactions list</section>
      <aside className={styles.sidebar}>
        <TransactionForm />
      </aside>
    </main>
  );
}
