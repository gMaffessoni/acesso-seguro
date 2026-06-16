class HomeController {
  index(req, res) {
    return res.inertia('Home/Index');
  }
}

export default new HomeController();