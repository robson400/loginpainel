import { useState } from 'react'
import Link from 'next/link'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import styles from '../styles/Cadastro.module.css'
import LoginCard from '../src/components/loginCard/loginCard'
import Input from '../src/components/input/inputs'
import Button from '../src/components/button/button'

export default function CadastroPage(){
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch(`/api/user/cadastro`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const json = await response.json()
            console.log(response.status)
            if (response.status !== 201) throw new Error(json)

            setCookie('authorization', json)
            router.push('/')

        } catch (err) {
        setError(err.message)
    }
}
    return (
        <div className={styles.background}>
            <LoginCard title="Crie sua Conta.">
                <form onSubmit={handleForm} className={styles.form}>
                    <Input type="text" placeholder="Seu Nome" required value={formData.name} onChange={ (e) => {handleFormEdit(e, 'name')}} />
                    <Input type="email" placeholder="Seu e-mail" required value={formData.email} onChange={ (e) => {handleFormEdit(e, 'email')}} />
                    <Input type="password" placeholder="Sua Senha" required value={formData.password} onChange={ (e) => {handleFormEdit(e, 'password')}} />
                    <Button>Cadastrar</Button>
                    {error && <p className={styles.error}>{error}</p>}
                    <Link href="/login">Já possui conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}