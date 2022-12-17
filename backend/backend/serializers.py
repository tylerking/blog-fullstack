from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)
    author = serializers.StringRelatedField()
    class Meta:
        model = Article
        #fields = ['title', 'desc', 'slug', 'published']
        fields = '__all__'


# class ArticleSerializer(serializers.Serializer):
#     title = serializers.CharField(max_length=200)
#     desc = serializers.CharField()
#     slug = serializers.SlugField(max_length=200)
#     published = serializers.DateTimeField(read_only=True)

#     def create(self, validated_data):
#         return Article.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.desc = validated_data.get('desc', instance.desc)
#         instance.slug = validated_data.get('slug', instance.slug)
#         instance.published = validated_data.get('published', instance.published)
#         instance.save()
#         return instance