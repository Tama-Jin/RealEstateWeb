class RenameTransactionToTradingInProperties < ActiveRecord::Migration[6.0]
  def change
    rename_column :properties, :transaction, :trading
  end
end
