import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import ProfileEditPage from '../pages/ProfileEditPage/ProfileEditPage'
import ProfileDeletePage from '../pages/ProfileDeletePage/ProfileDeletePage'
import UserDetailsPage from '../pages/UserDetails/UserDetails'
import ClassesListPage from '../pages/ClassesListPage/ClassesListPage'
import ClassesCreatePage from '../pages/ClassesCreatePage/ClassesCreatePage'
import PostsListPage from '../pages/PostsListPage/PostsListPage'
import PostCreatePage from '../pages/PostCreatePage/PostCreatePage'
import PostEditPage from '../pages/PostEditPage/PostEditPage'
import ConversationsListPage from '../pages/ConversationsListPage/ConversationsListPage'
import ContactPage from '../pages/ContactPage/ContactPage'
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage'
import ReviewsPage from '../pages/ReviewsPage/ReviewsPage'
import ReviewsEditPage from '../pages/ReviewsEditPage/ReviewsEditPage'
import MatchPage from '../pages/MatchPage/MatchPage'
import IsPrivate from './isPrivate'
import ClassesEditPage from '../pages/ClassesEditPage/ClassesEditPage'
import UsersMap from '../pages/UsersMap/UsersMap'
import ClassesPage from '../pages/ClassesPage/ClassesPage'
import SucessPaymentPage from '../pages/SucessPaymentPage/SucessPaymentPage'
import CancelPaymentPage from '../pages/CancelPaymentPage/CancelPaymentPage'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignupPage />}></Route>

            <Route path='/profile' element={<IsPrivate />}>
                <Route index element={<ProfilePage />}></Route>
            </Route>

            <Route path='/profile/edit' element={<IsPrivate />}>
                <Route index element={<ProfileEditPage />}></Route>
            </Route>

            <Route path='/profile/delete' element={<IsPrivate />}>
                <Route index element={<ProfileDeletePage />}></Route>
            </Route>

            <Route path='/users' element={<IsPrivate />}>
                <Route index element={<UsersMap />}></Route>
            </Route>

            <Route path='/users/:id' element={<IsPrivate />}>
                <Route index element={<UserDetailsPage />}></Route>
            </Route>

            <Route path='/match' element={<IsPrivate />}>
                <Route index element={<MatchPage />}></Route>
            </Route>

            <Route path='/classes' element={<IsPrivate />}>
                <Route index element={<ClassesListPage />}></Route>
            </Route>

            <Route path='/class/:id' element={<IsPrivate />}>
                <Route index element={<ClassesPage />}></Route>
            </Route>

            <Route path='/classes/create' element={<IsPrivate />}>
                <Route index element={<ClassesCreatePage />}></Route>
            </Route>

            <Route path='/classes/edit/:class_id' element={<IsPrivate />}>
                <Route index element={<ClassesEditPage />}></Route>
            </Route>

            <Route path='/conversations' element={<IsPrivate />}>
                <Route index element={<ConversationsListPage />}></Route>
            </Route>

            <Route path='/posts' element={<IsPrivate />}>
                <Route index element={<PostsListPage />}></Route>
            </Route>

            <Route path='/posts/create' element={<IsPrivate />}>
                <Route index element={<PostCreatePage />}></Route>
            </Route>

            <Route path='/posts/edit/:post_id' element={<IsPrivate />}>
                <Route index element={<PostEditPage />}></Route>
            </Route>

            <Route path='/reviews/create/:user_id' element={<IsPrivate />}>
                <Route index element={<ReviewsPage />}></Route>
            </Route>

            <Route path='/reviews/edit/:review_id/:reviewed_user' element={<IsPrivate />}>
                <Route index element={<ReviewsEditPage />}></Route>
            </Route>

            <Route path='/payments/success' element={<IsPrivate />}>
                <Route index element={<SucessPaymentPage />}></Route>
            </Route>

            <Route path='/payments/cancel' element={<IsPrivate />}>
                <Route index element={<CancelPaymentPage />}></Route>
            </Route>

            <Route path='/contact' element={<ContactPage />}></Route>
            <Route path='/about' element={<AboutUsPage />}></Route>
        </Routes>
    )
}

export default AppRoutes