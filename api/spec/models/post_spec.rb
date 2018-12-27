require 'spec_helper'

RSpec.describe Post do
  fixtures :posts

  context "callbacks" do
    it "should destroy itself if view_count has reached max_view_count" do
      expect do
        posts(:one).update!(view_count: 1)
        posts(:two).update!(view_count: 3)
        posts(:three).update!(view_count: 3)
      end.to change { Post.count }.by(-2)
    end

    it "should not allow creation of post with no content" do
      expect {
        expect {
          Post.create!(content: nil, slug: SecureRandom.hex)
        }.to raise_error { ActiveRecord::RecordInvalid }

        expect {
          Post.create!(content: "", slug: SecureRandom.hex)
        }.to raise_error { ActiveRecord::RecordInvalid }
      }.to change { Post.count }.by(0)
    end
  end
end
