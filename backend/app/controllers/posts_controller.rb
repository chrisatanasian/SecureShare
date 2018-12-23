class PostsController < ApplicationController
  before_action :set_post, only: [:show]

  # GET /posts/9c26164af3c44efc26342266745c8754
  def show
    render json: @post

    if @post
      view_count = @post.view_count
      @post.update!(view_count: view_count + 1)
    end
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    @post.slug = SecureRandom.hex

    if @post.save!
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find_by(slug: params[:slug])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.fetch(:post, {}).permit(:content)
    end
end
