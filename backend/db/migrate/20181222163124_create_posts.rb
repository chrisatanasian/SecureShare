class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :content
      t.integer :view_count, default: 0
      t.integer :max_view_count, default: 1
      t.string :slug, null: false

      t.timestamps
    end
    add_index :posts, :slug, unique: true
  end
end
