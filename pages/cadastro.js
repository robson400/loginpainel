import Link from 'next/link'
import styles from '../styles/Cadastro.module.css'
import LoginCard from '../src/components/loginCard/loginCard'
import Input from '../src/components/input/inputs'
import Button from '../src/components/button/button'

export default function CadastroPage(){
    return (
        <div className={styles.background}>
            <LoginCard title="Crie sua Conta.">
                <form className={styles.form}>
                    <Input type="text" placeholder="Seu Nome" />
                    <Input type="email" placeholder="Seu e-mail" />
                    <Input type="password" placeholder="Sua Senha" />
                    <Button>Cadastrar</Button>
                    <Link href="/login">Já possui conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}