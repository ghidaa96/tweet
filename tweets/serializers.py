from rest_framework import serializers 
from .models import Tweet
from django.conf import settings
MAX_TWEET_LENGTH= settings.MAX_TWEET_LENGTH
TWEET_ACTION_OPTION = settings.TWEET_ACTION_OPTION 
 
class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)
    def validate_Action(self,value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTION:
            raise serializers.ValidationError("this is not a valid action for tweets")
        return value

class TweetCreateSerializer(serializers.ModelSerializer):
    like = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Tweet
        fields  =['id', 'content', 'like']
    def get_like(self, obj):
        return obj.like.count()
    def validate_cintent(self,value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("this tweet is so long")
        return value

class TweetSerializer(serializers.ModelSerializer):
    like = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)
    class Meta:
        model=Tweet
        fields  =['id', 'content', 'like', 'is_retweet','parent']
    def get_like(self, obj):
        return obj.like.count()

