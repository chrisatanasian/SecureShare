require 'spec_helper'

RSpec.describe PostsController do
  fixtures :posts

  setup do
    @post = posts(:one)
  end

  it "should create post with random slug" do
    10.times do
      expect {
        post "/posts", params: { post: { content: "my content" } }, as: :json
      }.to change { Post.count }.by(1)

      expect(response.status).to be(201)
      response_body = JSON.parse(response.body)
      last_post = Post.last

      expect(last_post.content).to eq(response_body["content"])
      expect(last_post.view_count).to eq(response_body["view_count"])
      expect(last_post.max_view_count).to eq(response_body["max_view_count"])
      expect(last_post.slug).to eq(response_body["slug"])
    end
  end

  it "should show and destroy post" do
    expect {
      get "/posts/#{@post.slug}", as: :json
    }.to change { Post.count }.by(-1)
    expect(response.status).to be(200)

    response_body = JSON.parse(response.body)

    expect(@post.content).to eq(response_body["content"])
    expect(@post.view_count).to eq(response_body["view_count"])
    expect(@post.max_view_count).to eq(response_body["max_view_count"])
    expect(@post.slug).to eq(response_body["slug"])

    expect(Post.find_by(id: @post.id)).to eq(nil)
  end

  it "should not error out when viewing a nonexisting post" do
      get "/posts/#{@post.slug}", as: :json # deletes the post
      get "/posts/#{@post.slug}", as: :json

      expect(JSON.parse(response.body)).to eq(nil)
  end
end
