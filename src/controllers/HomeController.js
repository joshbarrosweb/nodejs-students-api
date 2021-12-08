class HomeController {
  async index(request, response) {
    response.json('Home');
  }
}

export default new HomeController();
