import Link from 'next/link'
import styles from '../styles/Login.module.css'
import { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import LoginCard from '../src/components/loginCard/loginCard'
import Input from '../src/components/input/inputs'
import Button from '../src/components/button/button'

export default function LoginPage(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const router = useRouter()

    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch(`/api/user/login`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const json = await response.json()
            console.log(response.status)
            if (response.status !== 200) throw new Error(json)

            setCookie('authorization', json)
            router.push('/')

        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className={styles.background}>
            <LoginCard title="Entre na sua Conta.">
                <form className={styles.form} onSubmit={handleForm}>
                    <Input type="email" placeholder="Seu e-mail" value={formData.email} required onChange={ (e) => {handleFormEdit(e, 'email')}} />
                    <Input type="password" placeholder="Sua Senha" value={formData.password} required onChange={ (e) => {handleFormEdit(e, 'password')}} />
                    <Button>Entrar</Button>
                    {error && <p className={styles.error}>{error}</p>}
                    <Link href="/cadastro">Ainda não possui conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}