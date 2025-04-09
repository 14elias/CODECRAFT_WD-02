from django.urls import path
from .views import CustomTokenObtainPairView,CustomTokenRefreshView,LogoutView,isAuthenticated

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('is_authenticated/', isAuthenticated.as_view(), name='is_authenticated'),
]