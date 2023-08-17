import axios from "axios"
import { UserContext } from "../App.jsx"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { SingInContainer, TitleContainer, ContentContainer, FormContainer } from "./SignInPage/styled.js"

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