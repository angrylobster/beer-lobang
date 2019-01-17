var React = require('react');

class Default extends React.Component {
  render() {
    return (
      <html>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form method="POST" action="/users/login" >
                  <div className="form-group">
                    <label htmlFor="login-username">Username</label>
                    <input type="text" className="form-control" name="login-username" id="login-username" aria-describedby="emailHelp" placeholder=""/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" className="form-control" name="login-password" id="login-password" placeholder=""/>
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                  <a className="btn btn-success ml-1 text-light" href="#test" data-toggle="modal" data-dismiss="modal">Register</a>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="test" tabIndex="-1" role="dialog" aria-labelledby="testModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="testModalLabel">Register</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form data-toggle="validator" role="form" method="POST" action="/users/register">
                  <div className="form-group">
                    <label htmlFor="register-username">Username</label>
                    <input type="text" className="form-control" name="register-username" id="register-username" aria-describedby="emailHelp" placeholder=""/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-password">Password</label>
                    <input type="password" className="form-control" name="register-password" id="register-password" placeholder=""/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-password-confirm">Confirm Password</label>
                    <input type="password" className="form-control" name="register-password-confirm" id="register-password-confirm" placeholder=""/>
                  </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/style.css"></link>
        </head>
        <body>
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-expand-md fixed-top">
            <div className="container text-light">
              <a className="navbar-brand" href="#">Beer Lobang!</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto ">
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/users/map">Map</a>
                  </li>
                </ul>
                  {
                    this.props.loggedIn ? 
                    (<button className="btn btn-light my-2 my-sm-0" type="submit" id="logout-button">Logout</button>) : 
                    (<button className="btn btn-light my-2 my-sm-0" type="submit" id="login-button" data-toggle="modal" data-target="#exampleModal">Login</button>)
                  }
              </div>
            </div>
          </nav>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"></script>
            {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = Default;