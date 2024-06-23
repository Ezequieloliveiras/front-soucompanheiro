import axios from 'axios'

export default axios.create({baseURL: 'http://192.168.0.4:8002'})
// export default axios.create({baseURL: 'https://back-soucompanheiro.onrender.com/api/users/'})