defmodule PlaygroundWeb.PreviewLive do

  use PlaygroundWeb, :live_view



  def render(assigns) do
    ~H"""
    <div class="container">
    <.flash_group flash={@flash} />
    <h1> Widgets </h1>

    <.showcase class="w-5/6 h-64">
    <:title>Button Component</:title>
    <:example name="Standard" class="bg-black/90 relative w-full h-full">
        <div class="absolute inset-[35%] block rounded-full bg-white/50  blur-2xl"></div>
        <div class="relative flex h-fit  w-full flex-col items-center justify-center">
                <.button class="eui-demo" name="bob" phx-click="ohno" >Standard</.button>
        </div>
    </:example>
    <:example name="Disabled" class="bg-black/90 relative w-full h-full">
        <div class="absolute inset-[35%] block rounded-full bg-white/50  blur-2xl"></div>
        <div class="relative flex h-fit  w-full flex-col items-center justify-center">
                <.button class="eui-demo" disabled name="bob" >Disabled</.button>
        </div>
    </:example>
    </.showcase>

    <.showcase class="w-5/6 h-64">
    <:title>Checkbox Component</:title>
    <:example name="Checked" class="bg-black/90 relative w-full h-full">
        <div class="absolute inset-[35%] block rounded-full bg-white/50  blur-2xl"></div>
        <div class="relative flex h-fit  w-full flex-col items-center justify-center">
                <.checkbox phx-change="pending" checked class="eui-demo group" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="hidden size-4 fill-black group-data-[checked]:block"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
                </.checkbox>
        </div>
    </:example>

    <:example name="Unchecked" class="bg-black/90 relative w-full h-full">
        <div class="absolute inset-[35%] block rounded-full bg-white/50  blur-2xl"></div>
        <div class="relative flex h-fit  w-full flex-col items-center justify-center">
                <.checkbox  phx-change="pending2" class="eui-demo group" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="hidden size-4 fill-black group-data-[checked]:block"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
        </.checkbox>
        </div>
    </:example>


    <:example name="Disabled Checked" class="bg-black/90 relative w-full h-full">
        <div class="absolute inset-[35%] block rounded-full bg-white/50  blur-2xl"></div>
        <div class="relative flex h-fit  w-full flex-col items-center justify-center">
                <.checkbox phx-change="pending3"  disabled checked class="eui-demo group" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="hidden size-4 fill-black group-data-[checked]:block"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
        </.checkbox>
        </div>
    </:example>

    <:example name="Disabled Unchecked" class="bg-black/90 relative w-full h-full">
        <div class="absolute inset-[35%] block rounded-full bg-white/50  blur-2xl"></div>
        <div class="relative flex h-fit  w-full flex-col items-center justify-center">
                <.checkbox  phx-change="pending4"  disabled class="eui-demo group" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="hidden size-4 fill-black group-data-[checked]:block"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg>
        </.checkbox>
        </div>
    </:example>


    </.showcase>





    <.showcase class="w-5/6 h-64">
    <:title>Textarea Component</:title>
    <:example name="Basic" class="bg-black/90 relative w-full h-full">
        <.textarea rows="3"
          phx-change="pending4"
          class="eui-demo"
    >Basic</.textarea>
    </:example>
    </.showcase>





    <.showcase class="w-3/6 h-64">
    <:title>Dropdown Component</:title>
    <:example name="Basic">
        <.dropdown_menu>Basic</.dropdown_menu>
    </:example>
    </.showcase>

    <.showcase class="w-3/6 h-64">
    <:title>Disclosure Component</:title>
    <:example name="Basic">
        <.disclosure>Basic</.disclosure>
    </:example>
    </.showcase>

    <.showcase class="w-3/6 h-64">
    <:title>Dialog Component</:title>
    <:example name="Basic">
        <.dialog>Basic</.dialog>
    </:example>
    </.showcase>

    <.showcase class="w-3/6 h-64">
    <:title>Popover Component</:title>
    <:example name="Basic">
        <.popover>Basic</.popover>
    </:example>
    </.showcase>

    <.showcase class="w-3/6 h-64">
    <:title>Tabs Component</:title>
    <:example name="Basic">
        <.tabs>Basic</.tabs>
    </:example>
    </.showcase>

    <.showcase class="w-3/6 h-64">
    <:title>Transition Component</:title>
    <:example name="Basic">
        <.transition>Basic</.transition>
    </:example>
    </.showcase>



    <.showcase class="w-3/6 h-64">
    <:title>Button Component</:title>
    <:example name="Basic">
        <.button>Standard Button</.button>
    </:example>
    <:example name="As Span">
        <.button as="span" >Span Button</.button>
    </:example>
    <:example name="As Link">
        <.button as="a" >Link Button</.button>
    </:example>


    <:example name="Stylized" class="bg-black">
        <.button class="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" >Hello Dolly</.button>
    </:example>


    </.showcase>



    <.showcase class="w-3/6 h-64">
    <:title>Checkbox Component</:title>
    <:example name="Basic">
        <.checkbox>Basic</.checkbox>
    </:example>
    </.showcase>


    <.showcase class="w-3/6 h-64">
    <:title>Combobox Component</:title>
    <:example name="Basic">
        <.combobox>Basic</.combobox>
    </:example>
    </.showcase>



    <.showcase class="w-3/6 h-64">
    <:title>Fieldset Component</:title>
    <:example name="Basic">
        <.fieldset>Basic</.fieldset>
    </:example>
    </.showcase>



    <.showcase class="w-3/6 h-64">
    <:title>Input Component</:title>
    <:example name="Basic">
        <.input>Basic</.input>
    </:example>
    </.showcase>



    <.showcase class="w-3/6 h-64">
    <:title>Listbox Component</:title>
    <:example name="Basic">
        <.listbox>Basic</.listbox>
    </:example>
    </.showcase>



    <.showcase class="w-3/6 h-64">
    <:title>RadioGroup Component</:title>
    <:example name="Basic">
        <.radio_group>Basic</.radio_group>
    </:example>
    </.showcase>



    <.showcase class="w-3/6 h-64">
    <:title>Select Component</:title>
    <:example name="Basic">
        <.select>Basic</.select>
    </:example>
    </.showcase>



    <.showcase class="w-3/6 h-64">
    <:title>Switch Component</:title>
    <:example name="Basic">
        <.switch>Basic</.switch>
    </:example>
    </.showcase>



    </div>
    """
  end

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def handle_event("ping", _value, socket) do
    {:noreply, assign(socket, :pinged, true)}
  end


  def handle_event(event,_,socket) do
    socket = socket
             |> put_flash(:info, "Event: #{event}")
    {:noreply, socket}
  end

 end
