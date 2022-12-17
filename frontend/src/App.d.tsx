export interface IArticle {
  id: number,
  author: string,
  desc: string,
  title: string,
  published: string,
  slug: string,
}

export interface IUserDetails {
  pk: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
}

export interface ILoginErrors {
  non_field_errors?: string,
}

export interface IRegisterErrors {
  username?: string,
  email?: string,
  password1?: string,
  password2?: string,
}