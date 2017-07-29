class User < ApplicationRecord
  attr_accessor :remember_token
  has_one :catalog, dependent: :destroy

  has_secure_password

  validates :name, presence: true
  validates :email, presence: true,
                    uniqueness: true,
                    format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/ }

  validates :password, presence: true,
                       length: { in: 8..40 },
                       format: { with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,40}\z/,
                                 message: 'must include at least one lowercase letter, ' \
                                          'one uppercase letter, and one digit.' }

  before_validation :downcase_email

  class << self
    def digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
      BCrypt::Password.create(string, cost: cost)
    end

    def new_token
      SecureRandom.urlsafe_base64
    end
  end

  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  def forget
    update_attribute(:remember_digest, nil)
  end

  private

  def downcase_email
    email.try(:downcase!)
  end
end
