from django.shortcuts import render
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.response import Response
from rest_framework import status

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self,request,*args,**kwargs):
        try:
            response = super().post(request,*args,**kwargs)

            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response = Response({'message': "Logged in successfully"}, status=status.HTTP_200_OK)

            response.set_cookie(
                key='access_token',
                value=access_token,
                samesite='None',
                secure=True,
                httponly=True,
                path='/',
            )

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                samesite='None',
                secure=True,
                httponly=True,
                path='/',
            )

            return response
        except Exception as e:
            return Response({'message':"something went wrong "},status=status.HTTP_400_BAD_REQUEST)


class CustomTokenRefreshView(TokenRefreshView):
    def post(self,request,*args,**kwargs):
        try:
            refresh_token= request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({'message': "No refresh token provided."}, status=status.HTTP_400_BAD_REQUEST)
            request.data['refresh'] = refresh_token

            response = super().response(request,*args,**kwargs)

            access_token = response.data.get('access')
            if not access_token:
                return Response({'message': "Token refresh failed."}, status=status.HTTP_400_BAD_REQUEST)
            
            res = Response({'message':"refreshed successfully"},status = status.HTTP_200_OK)

            response.set_cookie(
                    key='access_token',
                    value=access_token,
                    samesite='None',
                    secure=True,
                    httponly=True,
                    path='/',
                )
            
            return res
        except Exception as e:
            return Response({'message': "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)