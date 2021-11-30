import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Navbar } from './app/Navbar';
import { UsersPage } from './features/users/UsersPage';
import { PostsList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import { EditPostForm } from './features/posts/EditPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { SingleUserPage } from './features/users/SingleUserPage';
import { NotificationsList } from './features/notificiations/NotificationsList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddPostForm />
                <PostsList />
              </>
            )}
          />
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/users/:userId" component={SingleUserPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
