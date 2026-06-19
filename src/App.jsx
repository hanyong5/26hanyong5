import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'

import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import LoginSuccess from './pages/auth/LoginSuccess'

import AboutLayout from './pages/about/AboutLayout'
import Company from './pages/about/Company'
import CEO from './pages/about/CEO'
import Vision from './pages/about/Vision'
import History from './pages/about/History'
import Location from './pages/about/Location'

import ProductList from './pages/products/ProductList'
import ProductDetail from './pages/products/ProductDetail'

import PostList from './pages/community/PostList'
import PostDetail from './pages/community/PostDetail'
import PostWrite from './pages/community/PostWrite'
import PostEdit from './pages/community/PostEdit'

import InquiryWrite from './pages/inquiry/InquiryWrite'
import InquiryList from './pages/inquiry/InquiryList'

import MyPage from './pages/mypage/MyPage'

import AdminLayout from './pages/admin/AdminLayout'
import AdminMembers from './pages/admin/AdminMembers'
import AdminProducts from './pages/admin/AdminProducts'
import AdminProductForm from './pages/admin/AdminProductForm'
import AdminPosts from './pages/admin/AdminPosts'
import AdminInquiries from './pages/admin/AdminInquiries'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth — no layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/success" element={<LoginSuccess />} />
          <Route path="/register" element={<Register />} />

          {/* Home */}
          <Route path="/" element={<Layout><Home /></Layout>} />

          {/* 회사소개 */}
          <Route path="/about" element={<Layout><AboutLayout /></Layout>}>
            <Route index element={<Navigate to="/about/company" replace />} />
            <Route path="company" element={<Company />} />
            <Route path="ceo" element={<CEO />} />
            <Route path="vision" element={<Vision />} />
            <Route path="history" element={<History />} />
            <Route path="location" element={<Location />} />
          </Route>

          {/* 제품소개 */}
          <Route path="/products" element={<Layout><ProductList /></Layout>} />
          <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />

          {/* 커뮤니티 */}
          <Route path="/community" element={<Layout><PostList /></Layout>} />
          <Route path="/community/:id" element={<Layout><PostDetail /></Layout>} />
          <Route path="/community/write" element={
            <ProtectedRoute><Layout><PostWrite /></Layout></ProtectedRoute>
          } />
          <Route path="/community/:id/edit" element={
            <ProtectedRoute><Layout><PostEdit /></Layout></ProtectedRoute>
          } />

          {/* 온라인문의 */}
          <Route path="/inquiry" element={
            <ProtectedRoute><Layout><InquiryWrite /></Layout></ProtectedRoute>
          } />
          <Route path="/inquiry/list" element={
            <ProtectedRoute><Layout><InquiryList /></Layout></ProtectedRoute>
          } />

          {/* 마이페이지 */}
          <Route path="/mypage" element={
            <ProtectedRoute><Layout><MyPage /></Layout></ProtectedRoute>
          } />

          {/* 관리자 */}
          <Route path="/admin" element={
            <AdminRoute><Layout><AdminLayout /></Layout></AdminRoute>
          }>
            <Route index element={<Navigate to="/admin/members" replace />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductForm />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
