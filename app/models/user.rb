class User < ApplicationRecord
  has_one :catalog

  has_secure_password

  validates :name, presence: true
  validates :email, presence: true,
                    uniqueness: true,
                    format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/ }

  before_validation :downcase_email

  private

  def downcase_email
    email.try(:downcase!)
  end
end
