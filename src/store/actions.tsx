// @ts-ignore
import axios from 'axios'

export const fetchPages = (type: string) => async () => {
  try {
    // const res: any = await axios.get(url)
    // return { type: 'page', payload: res.data }
    return {}
  } catch (error) {
    console.error(error.message)
    return {}
  }
}

export const fetchPage = (url: string) => async () => {
  try {
    const res: any = await axios.get(url)
    return { type: 'page', payload: res.data }
  } catch (error) {
    console.error(error.message)
    return {}
  }
}

export const fetchName = () => async () => {
  try {
    const mockWebRequest = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: 'Mila Molla' })
        }, 750)
      })
    }
    const res: any = await mockWebRequest()
    return { type: 'change_name', payload: res.data }
  } catch (error) {
    console.error(error.message)
    return {}
  }
}

export const fetchEmailAddresses = () => async () => {
  try {
    const res: any = await axios.get('http://jsonplaceholder.typicode.com/users')
    const emails = res.data.map(data => data.email)
    return { type: 'email_addresses', payload: emails }
  } catch (error) {
    console.error(error.message)
    return {}
  }
}

export const fetchUserNameAndId = () => async () => {
  try {
    const res: any = await axios.get('http://jsonplaceholder.typicode.com/users')
    const data = res.data.map(data => ({ id: data.id, name: data.name }))
    return { type: 'set_user_data', payload: data }
  } catch (error) {
    console.error(error.message)
    return {}
  }
}
