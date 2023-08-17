import axios from "axios"
import { styled } from "styled-components"
import { UserContext } from "../contexts/userContext.jsx"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

export default function SignInPage() {
  const [login, setLogin] = useState({})
  const navigate = useNavigate()
  const { setToken, setUserId } = useContext(UserContext)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/timeline")
  }, [])

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setLogin(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsButtonDisabled(true)

    try {
      await signIn()
    } finally {
      setIsButtonDisabled(false)
    }
  }

  function signIn() {
    axios.post(`${process.env.REACT_APP_API_URL}/`, login)
      .then(res => {
        setToken(res.data.token)
        setUserId(res.data.userId)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", res.data.userId)
        navigate("/timeline")
      })
      .catch(err => alert(err.response.data))
  }
  
  return (
    <SingInContainer>

      <TitleContainer>
        <ContentContainer>
          <h1>Linkr</h1>
          <p>
            save, share and discover<br />the best links on the web
          </p>
        </ContentContainer>
      </TitleContainer>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <input
            data-test="email"
            required
            type="email"
            placeholder="E-mail"
            name="email"
            value={login.email || ""}
            onChange={handleChange}
          />
          <input
            data-test="password"
            required
            type="password"
            placeholder="Password"
            name="password"
            value={login.password || ""}
            onChange={handleChange}
          />
          <button
            data-test="login-btn"
            type="submit"
            disabled={isButtonDisabled}
          >Log In
          </button>
        </form>

        <Link data-test="sign-up-link" to="/signup">
          First time? Create an account!
        </Link>
      </FormContainer>

    </SingInContainer>
  )
}

export const SingInContainer = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  text-align: center;
  background: #151515;

  h1 {
    font-family: Passion One;
    font-size: 6.625em;
    font-weight: 700;
    line-height: 117px;
    letter-spacing: 0.05em;
    text-align: left;
    color: #FFFFFF;
  }

  p {
    font-family: Oswald;
    font-size: 2.6875em;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: left;
    color: #FFFFFF;
  }  

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input {
    width: 22.34375vw;
    height: 7.222222222222222vh;
    border-radius: 6px;
    margin-top: 20px;
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    text-indent: 20px;
    background: #FFFFFF;
  }

  button {
    width: 22.34375vw;
    height: 7.222222222222222vh;
    border-radius: 6px;
    border: none;
    background: #1877F2;
    margin-top:20px;
    margin-bottom: 20px;
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    overflow: hidden;
    color: #FFFFFF;
  }

  a {
    font-family: Lato;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    color: #FFFFFF;
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #333333;

    h1 {
      font-size: 76px;
      line-height: 84px;
    }

    p {
      font-size: 23px;
      line-height: 34px;
    }

    input { 
      width: 330px;
    }

    button { 
      width: 330px;
    }
  }
`

export const TitleContainer = styled.section`
  width: 63%;
  height: 100vh;
  box-shadow: 4px 0px 4px 0px #00000040;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 26%;
    background: #151515;
  }
`

export const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const FormContainer = styled.section`
  width: 37%;
  height: 100vh;
  background: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 40vh;
  }
`