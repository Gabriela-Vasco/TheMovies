export default function SignUp(){
    return (
        <div>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Nome</label>
                <input id="name" type="text" placeholder="Ex. Ana" />

                <label htmlFor="surname">Sobrenome</label>
                <input id="surname" type="text" placeholder="Ex. Silva" />

                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" placeholder="Ex. email@email.com"/>

                <label htmlFor="password">Senha</label>
                <input id="password" type="password"/>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}