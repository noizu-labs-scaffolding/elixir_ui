defmodule ElixirUI do
Phoenix.HTML
  @moduledoc """
  Documentation for `ElixirUI`.
  """


  @doc """
  Hello world.

  ## Examples

      iex> ElixirUI.hello()
      :world

  """
  def hello do
    :world
  end

  defmacro __using__(_) do
    quote do
      import ElixirUI.HeadlessComponents
    end
  end
end
