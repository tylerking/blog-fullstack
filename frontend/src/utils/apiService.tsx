class apiService {
  static async GetUser(token:string | null) {
    const res = await fetch(process.env.REACT_APP_API_HOST + 'rest-auth/user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    return await res.json()
  }

  static async LoginUser(username:string, password:string) {
    const res = await fetch(process.env.REACT_APP_API_HOST + 'rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
    return await res.json()
  }

  static async LogoutUser(token:string | null) {
    const res = await fetch(process.env.REACT_APP_API_HOST + 'rest-auth/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    return await res.json()
  }

  static async RegisterUser(body:object) {
    const res = await fetch(process.env.REACT_APP_API_HOST + 'rest-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return await res.json()
  }

  static async GetArticle(params: string | undefined) {
    const res = await fetch(process.env.REACT_APP_API_HOST + `articles/${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return await res.json()
  }

  static async GetArticles() {
    const res = await fetch(process.env.REACT_APP_API_HOST + 'articles/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return await res.json()
  }

  static async CreateArticle(body:object, token:string | null) {
    const res = await fetch(process.env.REACT_APP_API_HOST + 'articles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)
    })
    return await res.json()
  }

  static async UpdateArticle(article_slug:string, body:object, token:string) {
    const res = await fetch(process.env.REACT_APP_API_HOST + `articles/${article_slug}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)
    })
    return await res.json()
  }

  static DeleteArticle(article_slug:string, token:string | null) {
    return fetch(process.env.REACT_APP_API_HOST + `articles/${article_slug}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
  }
}

export default apiService