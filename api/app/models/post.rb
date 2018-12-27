class Post < ApplicationRecord
  after_update :destroy_self, if: :should_be_destroyed?

  validates :content, presence: true

  private

    def destroy_self
      self.destroy
    end

    def should_be_destroyed?
      view_count >= max_view_count
    end
end
