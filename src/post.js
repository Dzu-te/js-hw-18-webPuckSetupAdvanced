export default class Post {
  constructor(title) {
    this.title = title
    this.date = new Date()
  }

  toString() {
    const jsonString = JSON.stringify({
      title: this.title,
      date: this.date.toJSON().replace(/[a-zA-Z]/g, ' ')
    })
    return jsonString
  }
}
