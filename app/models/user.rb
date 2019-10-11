class User < ApplicationRecord
  devise :database_authenticatable, :trackable, :registerable, :recoverable, :rememberable, :validatable
  has_paper_trail

  def self.kyle
    User.find_by(email: 'kyle.p.fritz@gmail.com')
  end
end
