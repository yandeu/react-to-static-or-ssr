export const reducer = (state, action) => {
  switch (action.type) {
    case 'change_name':
      return { ...state, name: action.payload }
    case 'test':
      return { ...state, test: action.payload }
    case 'email_addresses':
      return { ...state, emails: action.payload }
    case 'set_user_data':
      return { ...state, userData: action.payload }
    case 'page':
      return { ...state, page: action.payload }
    default:
      return state
  }
}
