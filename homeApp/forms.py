from django.forms import ModelForm
from .models import HousePost ,  Images









class CreatePostForm(ModelForm):
    class Meta:
        model = HousePost
        fields = "__all__"
        exclude = ["user_owner","saved","viewd","status"]





class CreateImageForm(ModelForm):
    class Meta:
        model = Images
        fields = "__all__"
        # exclude = ["user_owner","saved","viewd","status"]
