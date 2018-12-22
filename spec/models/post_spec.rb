require 'spec_helper'

RSpec.describe Post, type: :model do
  fixtures :posts

  context "callbacks" do
    it "should destroy itself if view_count has reached max_view_count" do
      expect do
        posts(:one).update!(view_count: 1)
        posts(:two).update!(view_count: 3)
        posts(:three).update!(view_count: 3)
      end.to change { Post.count }.by(-2)
    end
  end
end
