from django.shortcuts import render
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import QueryDict


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self,request,*args,**kwargs):
        try:
            response = super().post(request,*args,**kwargs)

            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response = Response(
                {'message': "Logged in successfully"}, 
                status=status.HTTP_200_OK)

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
            return Response(
                {'message':"something went wrong "},
                status=status.HTTP_400_BAD_REQUEST)


class CustomTokenRefreshView(TokenRefreshView):
    def post(self,request,*args,**kwargs):
        try:
            refresh_token= request.COOKIES.get('refresh_token')

            if not refresh_token:
                return Response(
                    {"error": "No refresh token provided in cookies."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            data = QueryDict('', mutable=True)
            data.update(request.data)
            data['refresh'] = refresh_token
            request._full_data = data

            response = super().post(request,*args,**kwargs)

            access_token = response.data.get('access')

            if not access_token:
                return Response(
                    {"error": "Invalid or expired refresh token"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            res = Response({
                "message":"refreshed successfully"
                },status=status.HTTP_204_NO_CONTENT) 

            res.set_cookie(
                    key='access_token',
                    value=access_token,
                    samesite='None',
                    secure=True,
                    httponly=True,
                    path='/',
                )
            
            res.set_cookie(
                    key='refresh_token',
                    value=refresh_token,
                    samesite='None',
                    secure=True,
                    httponly=True,
                    path='/',
                )
            
            return res
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class isAuthenticated(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        return Response({'message':'authenticated'})
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        access_token = request.COOKIES.get('access_token')
        
        refresh_token = request.COOKIES.get('refresh_token')
        
        response = Response({'message':"successfully logged out "}, status = status.HTTP_202_ACCEPTED)

        if access_token:
            response.delete_cookie('access_token', path='/')
        if refresh_token:
            response.delete_cookie('refresh_token', path='/')

        return response