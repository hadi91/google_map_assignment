class CreateMaps < ActiveRecord::Migration[5.1]
  def change
    create_table :maps do |t|
      t.text :address
      t.date :date
      t.text :description
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
