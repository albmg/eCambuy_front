import axios from 'axios'
export default function ({$axios}) {
  $axios.setBaseURL('http://localhost:3000/api')
}
