import Link from 'next/link'
import styles from '../styles/Login.module.css'
import LoginCard from '../src/components/loginCard/loginCard'
import Input from '../src/components/input/inputs'
import Button from '../src/components/button/button'

export default function LoginPage(){
    return (
        <div className={styles.background}>
            <LoginCard title="Entre na sua Conta.">
                <form className={styles.form}>
                    <Input type="email" placeholder="Seu e-mail" />
                    <Input type="password" placeholder="Sua Senha" />
                    <Button>Entrar</Button>
                    <Link href="/cadastro">Ainda não possui conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}