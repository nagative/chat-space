class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  validates :name, prexence: true
end
