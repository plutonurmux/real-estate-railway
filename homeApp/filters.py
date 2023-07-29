import django_filters
from .models import *



class HouseFilter(django_filters.FilterSet):
    class Meta:
        model = HousePost
        fields = ["city","category","transaction"]

